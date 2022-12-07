export default function Spinner() {
	return (
		<div className="d-flex justify-content-center mt-5">
			<div className="spinner-border"
			     style={{
					width: '4rem',
					height: '4rem'
				 }}>
				<span className="visually-hidden">Loading...</span>
			</div>
		</div>
	);
}