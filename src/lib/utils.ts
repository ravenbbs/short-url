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

export function deleteButtons() {
  const deleteButtons = document.getElementsByName('buttonDelete');
  const modal = document.getElementById('confirmDeleteModal') as HTMLDialogElement;
  const cancelDeleteButton = document.getElementById('cancelDeleteButton');
  const confirmDeleteButton = document.getElementById('confirmDeleteButton');
  let deleteCode = null;
  // console.log(deleteButtons)

  if (deleteButtons && modal && cancelDeleteButton && confirmDeleteButton) {
    for (const button of deleteButtons) {
      button.onclick = (e) => {
        const target = e.target as HTMLButtonElement;
        // console.log("target: ", target);

        if (!target?.value) return;
        deleteCode = target.value;
        // console.log("delete code : ", deleteCode);
        modal.showModal();
      };
    }
  }

  cancelDeleteButton.onclick = () => {
    modal.close();
    deleteCode = null;
  };

  confirmDeleteButton.onclick = async () => {
    if (deleteCode) {
      try {
        const response = await fetch('/api/delete-url', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: deleteCode }),
        });

        const result = await response.json();

        if (result.success) {
          toast.success('URL eliminada exitosamente');
          document.getElementById(deleteCode).remove();
        } else {
          toast.error('Error al eliminar la URL');
        }
      } catch {
        toast.error('No se pudo eliminar la URL');
      } finally {
        modal.close();
        deleteCode = null;
      }
    }
  };
}