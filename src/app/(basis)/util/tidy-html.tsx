/*
jonobase
/app/(basis)/util/tidy-html.tsx 
tidier HTML in components
*/

export const SectionDiv = ({
  ariaLabel = '', 
  ariaHidden = false,
  className = '',
  children}: any) => {

    return (
      <section 
        aria-label={ariaLabel} 
        aria-hidden={ariaHidden}
        className={className}
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

/* deprecated */

export const StandardFlex = ({
  className = '', 
  children
}: any) => {

  return (
    <div className={`flex flex-row justify-between items-center ${className}`}>
      {children}
    </div>
  )

}

export const StartFlex = ({
  className = '', 
  children
}: any) => {

  return (
    <div className={`
      flex flex-row justify-start items-start ${className}
    `}>
      {children}
    </div>
  )

}

export const EndFlex = ({
  className = '', 
  children
}: any) => {

  return (
    <div className={`
      flex flex-row justify-start items-end ${className}
    `}>
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