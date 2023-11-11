/*
jonobase
/app/(basis)/util/tidy-html.tsx 
tidier HTML in components
*/

export const SectionDiv = ({
  ariaLabel = '',
  ariaHidden = false,
  className = '',
  style = {},
  children}: any) => {

    return (
      <section 
        aria-label={ariaLabel} 
        aria-hidden={ariaHidden}
        className={className}
        style={style}
      >

        <div>
        
          { children }

        </div>

      </section>
    )

}

export const Paragraph = ({
  className = '', 
  children}: any) => {

  return (
    <p className={className}>
      {children}
    </p>    
  )

}

export const Span = ({
  ariaLabel = '', 
  ariaHidden = false, 
  className = '', 
  children}: any) => {

  return (
    <span 
      aria-label={ariaLabel}
      aria-hidden={ariaHidden}
      className={className}
    >
      {children}
    </span>
  )
  
}

export const SuperFlex = ({
  orientation = 'row',
  justify = 'between',
  items = 'center',
  textAlign = 'left',
  className = '',
  children
}: any) => {

  return (
    <div 
      className={`
        superflex
        flex flex-${orientation}
        justify-${justify}
        items-${items}
        text-${textAlign}
        ${className}
      `}
    >
      {children}
    </div>
  )

}

export const FeaturedIcon = ({
  ariaLabel
}: any) => {

  return (
    <Span 
      ariaLabel={ariaLabel}
      className={`feat-icon mr-2`}
    >📌</Span>
  )

}