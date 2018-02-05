import PropTypes from 'prop-types';
import React, {PureComponent, Fragment } from 'react';

/**
 * The partial component
 *
 * @disable-docs
 */
const License = ({_body}) => {
		return (
				<div className="row license">
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

License.propTypes = {
	/**
	 * _body: (test)(12)
	 */
	_body: PropTypes.node.isRequired,
};

License.defaultProps = {};

export default License;
