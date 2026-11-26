import { describe, it, expect, vi, afterEach } from 'vitest';
import { submitEnquiry } from '../../src/scripts/forms/submit';

function makeForm(honeypot = ''): HTMLFormElement {
  const form = document.createElement('form');
  form.setAttribute('action', 'https://example.test/submit');
  form.innerHTML = `
    <input name="name" value="Asha" />
    <input name="email" value="asha@example.test" />
    <input name="botcheck" value="${honeypot}" />`;
  return form;
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

const base = { loadedAt: 0, honeypotField: 'botcheck', now: () => 10_000 };

afterEach(() => {
  vi.useRealTimers();
});

describe('submitEnquiry', () => {
  it('treats a filled honeypot as accepted spam without sending', async () => {
    const fetchImpl = vi.fn();
    const out = await submitEnquiry(makeForm('x'), { ...base, fetchImpl });
    expect(out).toEqual({ state: 'accepted', spam: true });
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it('waits until minFillMs has elapsed before sending a fast submit', async () => {
    vi.useFakeTimers();
    const fetchImpl = vi.fn().mockResolvedValue(json({ success: true }));
    const p = submitEnquiry(makeForm(), { ...base, now: () => 2_000, fetchImpl });
    await vi.advanceTimersByTimeAsync(999);
    expect(fetchImpl).not.toHaveBeenCalled();
    await vi.advanceTimersByTimeAsync(1);
    expect(fetchImpl).toHaveBeenCalledTimes(1);
    expect(await p).toEqual({ state: 'accepted' });
  });

  it('starts the abort timeout only when the request is sent', async () => {
    vi.useFakeTimers();
    let signal!: AbortSignal;
    const fetchImpl = vi.fn((_u: unknown, init?: RequestInit) => {
      signal = init!.signal!;
      return new Promise<Response>(() => {});
    });
    void submitEnquiry(makeForm(), {
      ...base,
      now: () => 2_000,
      fetchImpl: fetchImpl as unknown as typeof fetch,
      timeoutMs: 5000,
    });
    await vi.advanceTimersByTimeAsync(1000);
    expect(fetchImpl).toHaveBeenCalledTimes(1);
    await vi.advanceTimersByTimeAsync(4999);
    expect(signal.aborted).toBe(false);
    await vi.advanceTimersByTimeAsync(1);
    expect(signal.aborted).toBe(true);
  });

  it.each([['{}', {}], ['null', null]])('reports unconfirmed when a 200 JSON body is %s', async (_n, body) => {
    const fetchImpl = vi.fn().mockResolvedValue(json(body));
    expect(await submitEnquiry(makeForm(), { ...base, fetchImpl })).toEqual({ state: 'unconfirmed' });
  });

  it('posts the form once as FormData with Accept: application/json', async () => {
    const form = makeForm();
    const fetchImpl = vi.fn().mockResolvedValue(json({ success: true }));
    await submitEnquiry(form, { ...base, fetchImpl });
    expect(fetchImpl).toHaveBeenCalledTimes(1);
    const [url, init] = fetchImpl.mock.calls[0];
    expect(url).toBe(form.action);
    expect(init.method).toBe('POST');
    expect(init.body).toBeInstanceOf(FormData);
    expect((init.body as FormData).get('name')).toBe('Asha');
    expect(init.headers).toEqual({ Accept: 'application/json' });
    expect(init.signal).toBeInstanceOf(AbortSignal);
  });

  it('accepts {success:true} (Web3Forms)', async () => {
    const fetchImpl = vi.fn().mockResolvedValue(json({ success: true }));
    expect(await submitEnquiry(makeForm(), { ...base, fetchImpl })).toEqual({ state: 'accepted' });
  });

  it('accepts {ok:true} (Formspree)', async () => {
    const fetchImpl = vi.fn().mockResolvedValue(json({ ok: true }));
    expect(await submitEnquiry(makeForm(), { ...base, fetchImpl })).toEqual({ state: 'accepted' });
  });

  it('rejects a 200 with {success:false}', async () => {
    const fetchImpl = vi.fn().mockResolvedValue(json({ success: false }));
    expect(await submitEnquiry(makeForm(), { ...base, fetchImpl })).toEqual({ state: 'rejected' });
  });

  it('rejects a 4xx', async () => {
    const fetchImpl = vi.fn().mockResolvedValue(json({ errors: [{ message: 'bad' }] }, 422));
    expect(await submitEnquiry(makeForm(), { ...base, fetchImpl })).toEqual({ state: 'rejected' });
  });

  it('reports unconfirmed when a 2xx body is not JSON', async () => {
    const fetchImpl = vi.fn().mockResolvedValue(new Response('<html>ok</html>', { status: 200 }));
    expect(await submitEnquiry(makeForm(), { ...base, fetchImpl })).toEqual({ state: 'unconfirmed' });
  });

  it('reports unconfirmed when fetch throws', async () => {
    const fetchImpl = vi.fn().mockRejectedValue(new TypeError('Failed to fetch'));
    expect(await submitEnquiry(makeForm(), { ...base, fetchImpl })).toEqual({ state: 'unconfirmed' });
  });

  it('reports unconfirmed after timeoutMs and never retries', async () => {
    vi.useFakeTimers();
    const fetchImpl = vi.fn(
      (_url: unknown, init?: RequestInit) =>
        new Promise<Response>((_res, rej) => {
          init!.signal!.addEventListener('abort', () => rej(new DOMException('aborted', 'AbortError')));
        }),
    );
    const p = submitEnquiry(makeForm(), {
      ...base,
      fetchImpl: fetchImpl as unknown as typeof fetch,
      timeoutMs: 15000,
    });
    await vi.advanceTimersByTimeAsync(15000);
    expect(await p).toEqual({ state: 'unconfirmed' });
    await vi.advanceTimersByTimeAsync(60000);
    expect(fetchImpl).toHaveBeenCalledTimes(1);
  });
});
