import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    tipoServicio: "",
    origen: "",
    destino: "",
    unidad: "",
    observaciones: "",
    subtotal: "",
    iva: "",
    retencion: "",
    total: "",
    anticipos: ["", "", ""],
    formaPago: "",
    validez: "",
    fotos: [],
  });

  const handleChange = (e, index) => {
    const { name, value, files } = e.target;
    if (name === "fotos") {
      setFormData({ ...formData, fotos: Array.from(files) });
    } else if (name === "anticipos") {
      const newAnticipos = [...formData.anticipos];
      newAnticipos[index] = value;
      setFormData({ ...formData, anticipos: newAnticipos });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const generatePDF = () => {
    if (typeof window !== "undefined") {
      import("html2pdf.js").then((html2pdf) => {
        const element = document.getElementById("formulario-preview");
        if (element) {
          html2pdf.default().from(element).save("cotizacion.pdf");
        }
      });
    }
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">Cotización de Servicio</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="tipoServicio" placeholder="Tipo de servicio" onChange={handleChange} className="border p-2" />
        <input name="origen" placeholder="Origen" onChange={handleChange} className="border p-2" />
        <input name="destino" placeholder="Destino" onChange={handleChange} className="border p-2" />
        <input name="unidad" placeholder="Unidad" onChange={handleChange} className="border p-2" />
        <textarea name="observaciones" placeholder="Observaciones" onChange={handleChange} className="border p-2" />
        <input name="subtotal" placeholder="Subtotal" onChange={handleChange} className="border p-2" />
        <input name="iva" placeholder="IVA" onChange={handleChange} className="border p-2" />
        <input name="retencion" placeholder="Retención" onChange={handleChange} className="border p-2" />
        <input name="total" placeholder="Total" onChange={handleChange} className="border p-2" />
        <input name="formaPago" placeholder="Forma de pago" onChange={handleChange} className="border p-2" />
        <input name="validez" placeholder="Días de validez" onChange={handleChange} className="border p-2" />
        {[0, 1, 2].map((i) => (
          <input
            key={i}
            name="anticipos"
            placeholder={`Anticipo ${i + 1}`}
            onChange={(e) => handleChange(e, i)}
            className="border p-2"
          />
        ))}
        <input type="file" name="fotos" multiple accept="image/*" onChange={handleChange} className="border p-2" />
      </div>

      <button onClick={generatePDF} className="bg-blue-600 text-white px-4 py-2 mt-4">
        Generar PDF
      </button>

      <div id="formulario-preview" className="p-6 bg-white mt-6 border rounded">
        <h2 className="text-lg font-semibold mb-2">Vista previa</h2>
        <p><strong>Tipo de servicio:</strong> {formData.tipoServicio}</p>
        <p><strong>Origen:</strong> {formData.origen}</p>
        <p><strong>Destino:</strong> {formData.destino}</p>
        <p><strong>Unidad:</strong> {formData.unidad}</p>
        <p><strong>Observaciones:</strong> {formData.observaciones}</p>
        <p><strong>Subtotal:</strong> {formData.subtotal}</p>
        <p><strong>IVA:</strong> {formData.iva}</p>
        <p><strong>Retención:</strong> {formData.retencion}</p>
        <p><strong>Total:</strong> {formData.total}</p>
        <p><strong>Forma de pago:</strong> {formData.formaPago}</p>
        <p><strong>Validez:</strong> {formData.validez} días</p>
        {formData.anticipos.map((a, i) => (
          <p key={i}><strong>Anticipo {i + 1}:</strong> {a}</p>
        ))}
        <div className="grid grid-cols-3 gap-2 mt-4">
          {formData.fotos.map((file, i) => (
            <img
              key={i}
              src={URL.createObjectURL(file)}
              alt={`foto-${i}`}
              className="w-full h-32 object-cover border"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
