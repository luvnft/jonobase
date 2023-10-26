/*
jonopoco
/app/basis/util/tidy-html.tsx : 
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

