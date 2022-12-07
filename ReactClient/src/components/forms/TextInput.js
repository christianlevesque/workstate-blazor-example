import { useEffect, useState } from 'react';

export default function TextInput({ children, value, setValue, minLength = 0, interval }) {
	const id = `input-${Math.random()}`;
	const valueLength = value?.length ?? 0;
	const diff = minLength - valueLength;
	const ending = diff > 1 ? "s" : "";

	const [internalValue, setInternalValue] = useState(value);

	useEffect(() => {
		if (value === internalValue) return;
		if (interval === 0) {
			setValue(internalValue);
			return;
		}

		const timeoutId = setTimeout(() => setValue(internalValue), interval);
		return () => clearTimeout(timeoutId);
	}, [internalValue]);

	function onInput(e) {
		setInternalValue(e.target.value);
	}

	function reset() {
		setValue('');
		setInternalValue('');
	}

	return (
		<div className="my-3">
			<div className="input-group">
				<label htmlFor={id}
				       className="input-group-text border-secondary">
					{children}
				</label>

				<input id={id}
				       className="form-control border-secondary border-end-0"
				       value={internalValue}
				       onInput={onInput}
				       onChange={onInput}/>

				<button className="btn btn-outline-secondary border-start-0"
				        type="button"
				        onClick={reset}>
					<i className="fas fa-times"></i>
				</button>
			</div>

			{minLength > 0 && valueLength < minLength && (
				<p className="text-danger">
					Please enter at least {diff} more character{ending}
				</p>
			)}
		</div>
	);
}