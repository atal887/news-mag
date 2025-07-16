import React from "react";

const InShortModal = ({ summary, onClose }) => {
    return (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}>
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content bg-dark text-light">
                    <div className="modal-header">
                        <h5 className="modal-title">In Short</h5>
                        <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        {summary ? (
                            <p>{summary}</p>
                        ) : (
                            <div className="text-center">
                                <div className="spinner-border text-light" role="status"></div>
                                <p>Generating summary...</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InShortModal;
