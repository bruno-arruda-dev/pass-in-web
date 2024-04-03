import { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"

type IconButtonProps = ComponentProps<'button'> & {
    transparent?: boolean,
}

export function IconButton({ transparent, ...props }: IconButtonProps) {
    return (
        <button
            {...props}
            className={twMerge(
                'border border-white/10 rounded-md p-1.5',
                transparent ? 'bg-transparent' : 'bg-white/20',
                props.disabled ? 'opacity-50' : null
            )}
        />
    )
}