import {
  forwardRef,
  type InputHTMLAttributes,
} from 'react'

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  hint?: string
  error?: string
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField(
    { label, hint, error, id, className, ...props },
    ref,
  ) {
    const fieldId = id ?? props.name

    return (
      <label className="field" htmlFor={fieldId}>
        <span className="field-label">{label}</span>

        <input
          ref={ref}
          id={fieldId}
          className={`field-input ${error ? 'field-input-error' : ''} ${className ?? ''}`}
          {...props}
        />

        {error ? (
          <span className="field-error">{error}</span>
        ) : hint ? (
          <span className="field-hint">{hint}</span>
        ) : null}
      </label>
    )
  },
)
