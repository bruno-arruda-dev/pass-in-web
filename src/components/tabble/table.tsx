import { ComponentProps } from "react"

type TableProps = ComponentProps<'table'> & {

}

export function Table({...rest}) {
    return (
        <div className='border rounded-lg border-white/10'>
            <table {...rest} className='w-full' />
        </div>
    )
}