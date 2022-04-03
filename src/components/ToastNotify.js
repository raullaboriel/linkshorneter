import React, { useCallback } from 'react'

const ToastNotify = ({ Toasts, setToasts }) => {

    const deleteToast = useCallback(() => {
        let tmpToasts = [...Toasts];
        tmpToasts.shift();
        setToasts(tmpToasts);
    }, [Toasts, setToasts]);

    React.useEffect(() => {
        const interval = setInterval(() => {
            if (Toasts.length) {
                deleteToast();
            }
        }, 4000);

        return () => {
            clearInterval(interval);
        }
    }, [Toasts, deleteToast])

    return (
        Toasts.map((toast, index) => (
            <div key={index} className={`alert alert-${(toast.type.toLowerCase())} alert-item position-relative`}>
                {toast.message}
            </div>
        ))
    )
}

export default ToastNotify