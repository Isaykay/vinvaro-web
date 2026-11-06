/** Off-screen field that only bots fill in; the API ignores submissions where it has a value. */
export function Honeypot() {
  return (
    <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}>
      <label>
        Website
        <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
      </label>
    </div>
  );
}

export function honeypotValue(form: EventTarget | null) {
  return form instanceof HTMLFormElement ? String(new FormData(form).get("website") ?? "") : "";
}
