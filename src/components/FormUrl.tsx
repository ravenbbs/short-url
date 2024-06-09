import {useRef, useState}  from "react";
import { CircleX } from "lucide-react";
import toast from 'react-hot-toast';

function validarURL(url: string): boolean {
  // Expresión regular para validar una URL
  const urlRegex = /^(ftp|http|https):\/\/[^ "]+\.[a-zA-Z]{2,}(\/\S*)?$/

  // Comprobamos si la URL coincide con la expresión regular
  return urlRegex.test(url)
}

export default function InputForm({userId}: {userId?: number}) {
  const [url, setUrl] = useState<string>()
  const [error, setError] = useState<string>()
  const shortUrlRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (e: any)  =>  { 
    e.preventDefault()

    if (!url) {
      toast.error("Debes escribir una URL")
      return
    }

    if (!validarURL(url)) {
      setError('Debes escribir una URL válida')
      return
    }

    try{
      const res = await fetch("/api/shorter-url", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url:url,
        userId: userId ?? null
      })
    })
    const body = await res.json()
    const Link = body.Link
    
    if(!Link) {
      setError("Error al acortar la URL, intenta mas tarde.")
      return
    }

    shortUrlRef.current!.value = Link
    if(Link){
      toast.success('URL acortada con éxito.')
      //window.location.reload();

    }

    setError(undefined)
    } catch {
      toast.error("Error al acortar la URL, intenta mas tarde.")
      setError("Error al acortar la URL, intenta mas tarde.")
    }
  }

  const handleCopy = () => {
    try {
      if (shortUrlRef.current!.value) {
      window.navigator.clipboard.writeText(shortUrlRef.current!.value)
      toast.success('URL copiada con éxito.')
      } return
      
    } catch {
      toast.error("No se pudo copiar la URL")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full mb-12 text-center items-center px-3">
        <h1 className="text-5xl my-8 mt-0 font-bold">Acorta tus URL's!!</h1>

      {error && (
        <div className="flex items-center gap-2">
          <h2 className="font-bold text-red-500">{error}</h2>
          <CircleX className="text-red-500" />
        </div>
      )}

      <label className="form-control w-full max-w-lg">
        <div className="label">
          <span className="label-text font-bold">URL:</span>
        </div>
        <input
          className="input mb-2 input-bordered w-full max-w-lg input-primary"
          placeholder="Escribe aquí tu URL"
          type="url"
          defaultValue={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </label>
      <button type="submit" className="btn w-full max-w-lg btn-active btn-primary">
        Acortar URL
      </button>

      <label className="form-control w-full max-w-lg mt-2">
        <div className="label">
          <span className="label-text font-bold">URL Acortada:</span>
        </div>
        <input
        disabled
        ref={shortUrlRef}
        className="input mb-2 w-full max-w-lg"
        type="text"
      />
      </label>

      <button type="button" onClick={handleCopy} className="btn w-full max-w-lg btn-active btn-success" >
        Copiar URL
      </button>
      
    </form>
  );
}