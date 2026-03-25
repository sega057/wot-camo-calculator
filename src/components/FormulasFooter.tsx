export default function FormulasFooter() {
  return (
    <details className="info">
      <summary>Formulas &amp; reference</summary>
      <div className="bd">
        <p>
          <strong>Stationary:</strong>
        </p>
        <p>
          <code>
            SpotRange = ViewRange − (CamoV/100 + BushCamo × CVSf) × (ViewRange −
            50)
          </code>
        </p>
        <p>
          <strong>Moving:</strong>
        </p>
        <p>
          <code>
            SpotRange = ViewRange − (CamoV_mov/100 × CVSm + BushCamo × CVSf) ×
            (ViewRange − 50)
          </code>
        </p>
        <p>
          <strong>Light tanks:</strong> CamoV_mov = CamoV (no moving penalty).
        </p>
        <p>
          <strong>Firing behind bush (15 m back):</strong> CamoFire replaces
          CamoV for the vehicle component.
        </p>
        <p>
          <strong>Firing in bush:</strong> retention factor = CamoFire / CamoV
          applied to total camo. Bush contribution capped at 50%.
        </p>
        <p>
          <strong>CVS bush factors (CVSf):</strong> None = 1.0 · 15% = 0.85 ·
          20% = 0.80
        </p>
        <p>
          <strong>CVS movement factors (CVSm):</strong> None = 1.0 · 15% = 0.90
          · 20% = 0.875
        </p>
        <p>
          <strong>Result is always clamped to 50 – 445 m.</strong>
        </p>
        <p style={{ marginTop: 10 }}>
          <strong>Shell travel distance:</strong>
        </p>
        <p>
          <code>D = (V_shell / 6) - 5</code> &nbsp; (min 50 m)
        </p>
      </div>
    </details>
  );
}
