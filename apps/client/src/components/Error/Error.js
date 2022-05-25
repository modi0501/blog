import './Error.css';
const Error = (props) => {
  const message = props.message;
  return (
    <div className="error">
      <p className="error-message">{message}</p>
    </div>
  )
}

export default Error;