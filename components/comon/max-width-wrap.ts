import { ReactNode, createElement } from 'react'

// tag can be any valid html element
type Props = {
  tag?: keyof HTMLElementTagNameMap
  className?: string
  children: ReactNode
}
function MaxWidthWrap({
  tag="section",
  children,
  className
}: Props) {
  return (
    createElement(
      tag,
      { className: `max-w-8xl mx-auto ${className}` },
      children
    )
  )
}

export default MaxWidthWrap