import { ComponentProps } from "react"

// interface NavLinkProps extends ComponentProps<'a'> {
//     children: string,
//     href: string,
// }

type NavLinkProps = ComponentProps<'a'> & {
    children: string,
    href: string,
}

export function NavLink({ children, href, ...rest }: NavLinkProps) {
    return (
        <a {...rest} href={href} className="text-sm font-medium">
            {children}
        </a>
    )
}