import PropTypes from "prop-types";

const MensajeError = ({ children }) => {
    return (
        <div className="bg-red-800 text-white text-center p-3 uppercase font-bold mb-3 rounded-md">
            <p>{children}</p>
        </div>
    );
};

MensajeError.propTypes = {
    children: PropTypes.node.isRequired,
};

export default MensajeError;