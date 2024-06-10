
import toast from 'react-hot-toast';

export function copyButtons () {
 const url = window.location.origin;
  const copyShortenedUrl = document.getElementsByName('buttonCopy');

  if (copyShortenedUrl) {
    for (const button of copyShortenedUrl) {
      button.onclick = (e) => {
        // @ts-ignore
        if (!e.target?.value) return;

        try {
          // @ts-ignore
          window.navigator.clipboard.writeText(`${url}/${e.target.value}`);
          toast.success('URL copiada al portapapeles!');
        } catch {
          toast.error('No se pudo copiar la URL al portapapeles');
        }
      };
    }
  }

}
 
export function deleteButtons () {

const deleteButtons = document.getElementsByName('buttonDelete');

if (deleteButtons) {
  for (const button of deleteButtons) {
    button.onclick = async (e) => {
              // @ts-ignore

      if (!e.target?.value) return;

      try {
        const response = await fetch('/api/delete-url', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },        
          // @ts-ignore
          body: JSON.stringify({ id: e.target.value }),
        });

        const result = await response.json();

        if (result.success) {
          toast.success('URL eliminada exitosamente');
          //window.location.reload();
        } else {
          toast.error('Error al eliminar la URL');
        }
      } catch {
        toast.error('No se pudo eliminar la URL');
      }
    }
  }

}
}
