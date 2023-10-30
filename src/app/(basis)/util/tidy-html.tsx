/*
jonopoco
/app/(basis)/util/tidy-html.tsx 
tidier HTML in components
*/

export const Line = ({
  className = '', 
  children}: any) => {

  return (
    <p 
      className={className}
    >
      {children}
    </p>    
  )

}

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

export const StandardFlex = ({
  children
}: any) => {

  return (
    <div className={`flex flex-row justify-between items-center`}>
      {children}
    </div>
  )

}