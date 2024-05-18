import {useRef, useState}  from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { CircleX } from "lucide-react";

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
      setError('Debes escribir una URL')
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
    console.log(body.link)
    const Link = body.Link
    
    if(!Link) {
      setError("Error al acortar la URL, intenta mas tarde.")
      return
    }

    shortUrlRef.current!.value = Link
    setError(undefined)
    } catch (e) {
      const error = e as Error
      setError("Error al acortar la URL, intenta mas tarde.")
    }
    
  }

  return (
    <form onSubmit={handleSubmit}>
      {
        error && (
          <div className="flex gap-2">
            <h2 className="font-bold text-red-500">
              {error}
            </h2>
            <CircleX className="text-red-500" />
          </div>

        )
      }
      <Input 
        className="outline-none border-none "
        placeholder="Escribe aquí tu URL" 
        type="url" 
        defaultValue={url}
        onChange={(e) => setUrl(e.target.value)}
        />
      <Button
        className="w-full ">
        Acortar URL
      </Button>
      <Input 
        disabled
        ref={shortUrlRef}
        className="outline-none border-none bg-gray-300 "
        type="text" />      
      <Button
        className="w-full ">
        Copiar URL
      </Button>
    </form>
  )
}