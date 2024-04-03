import { ComponentProps } from "react"

type TableHeaderProps = ComponentProps<'th'> & {

}

export function TableHeader({...rest}: TableHeaderProps) {
    return (
        <th {...rest} className='px-4 py-3 text-sm font-semibold text-left' />
    )
}