import PropTypes from 'prop-types';
import React, {PureComponent, Fragment } from 'react';

/**
 * The partial component
 *
 * @disable-docs
 */
const Partial = ({_body}) => {

		return (
				<div className="row group-body">
						<div className="col s12">
						<div className="card main-card">
							<div className="card-content ">
								<Fragment>
									{ _body }
								</Fragment>
							</div>
						</div>
					</div>
				</div>
		);
};

Partial.propTypes = {
	/**
	 * _body: (test)(12)
	 */
	_body: PropTypes.node.isRequired,
};

Partial.defaultProps = {};

export default Partial;
