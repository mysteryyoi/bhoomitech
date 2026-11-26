export type DeliveryOutcome =
  | { state: 'accepted'; spam?: true }
  | { state: 'rejected' }
  | { state: 'unconfirmed' };

export interface SubmitOptions {
  loadedAt: number;
  honeypotField: string;
  now?: () => number;
  fetchImpl?: typeof fetch;
  timeoutMs?: number;
  /** Minimum time since load before sending; faster submits are delayed, never dropped. */
  minFillMs?: number;
}

/**
 * Sends the enquiry exactly once. There is deliberately no retry: if the
 * outcome cannot be confirmed we say so, and the visitor decides.
 */
export async function submitEnquiry(
  form: HTMLFormElement,
  opts: SubmitOptions,
): Promise<DeliveryOutcome> {
  const now = opts.now ?? Date.now;
  const timeoutMs = opts.timeoutMs ?? 15000;
  const minFillMs = opts.minFillMs ?? 3000;

  const honeypot = form.elements.namedItem(opts.honeypotField) as HTMLInputElement | null;
  if (honeypot && honeypot.value) {
    return { state: 'accepted', spam: true };
  }

  // Snapshot before any wait so the validated payload is what gets sent.
  const payload = new FormData(form);
  form.querySelectorAll<HTMLInputElement>('[data-native-only]').forEach((el) => {
    if (el.name) payload.delete(el.name);
  });

  const remaining = minFillMs - (now() - opts.loadedAt);
  if (remaining > 0) {
    await new Promise<void>((resolve) => setTimeout(resolve, remaining));
  }

  const doFetch = opts.fetchImpl ?? globalThis.fetch.bind(globalThis);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await doFetch(form.action, {
      method: 'POST',
      body: payload,
      headers: { Accept: 'application/json' },
      signal: controller.signal,
      redirect: 'error',
    });
    // A 5xx or timeout may arrive after the provider stored the enquiry.
    if (res.status >= 500 || res.status === 408) return { state: 'unconfirmed' };
    if (!res.ok) return { state: 'rejected' };

    let body: { success?: unknown; ok?: unknown };
    try {
      body = await res.json();
    } catch {
      return { state: 'unconfirmed' };
    }
    if (body && (body.success === true || body.ok === true)) return { state: 'accepted' };
    if (body && (body.success === false || body.ok === false)) return { state: 'rejected' };
    return { state: 'unconfirmed' };
  } catch {
    return { state: 'unconfirmed' };
  } finally {
    clearTimeout(timer);
  }
}
