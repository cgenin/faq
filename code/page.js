import PropTypes from 'prop-types';
import React from 'react';


/**
 * The page layout component
 */
const Page = ({ title, stylesheet, header, main, footer, script, _relativeURL, _ID }) => (
	<html>
	<head>
		<title>Application XXX - { title }</title>
		<meta charSet="utf-8" />
		<meta httpEquiv="x-ua-compatible" content="ie=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />

		<link rel="stylesheet" href={ _relativeURL( `/assets/css/site.css`, _ID ) } />
		{
			stylesheet != undefined
				? ( <link rel="stylesheet" href={ _relativeURL( `/assets/css/${ stylesheet }.css`, _ID ) } /> )
				: null
		}
	</head>
	<body>
		<div className="top">
		<nav>
    		<div class="nav-wrapper main-color">
      			<a href="/" class="brand-logo" style={{marginLeft:'2em'}}><i className="mdi mdi-help-circle" ></i>Foire aux questions</a>
				
      			<ul id="nav-mobile" class="right hide-on-med-and-down">
        			<li><a ></a></li>
      			</ul>
    		</div>
  		</nav>
		  <main className="container">
				{(_ID=== 'index') ? (<div id="summary" className="row">
					<div className="col s12 m10 offset-m1">
						<div className="card main-card">
							<div className="card-content ">
							<span className="card-title">Table des matières</span>
							<div class="input-field">
								<input id="filter" type="text" placeholder="Filtrer..."/>
							</div>
							<my-summary/>						
							<my-results/>						
							</div>
						</div>
					</div>
				</div>)	: (<div/>)
			}
				{ main }
			</main>
		</div>

		<footer className="page-footer main-color">
		<div className="row">
          <div className="footer-copyright col m8 offset-m2">
            <div className="container">
            © 2018 Copyright Christophe Genin
            <a className="grey-text text-lighten-4 right" href="/license">License</a>
            </div>
            </div>
          </div>
        </footer>
		 <script src={ _relativeURL( `/assets/js/script.js`, _ID ) } /> 
	</body>
	</html>
);

Page.propTypes = {
/**
	 * title: Homepage
	 */
	title: PropTypes.string.isRequired,

	/**
	 * main: (partials)(5)
	 */
	main: PropTypes.node.isRequired,

	/**
	 * footer: (partials)(2)
	 */
	footer: PropTypes.node.isRequired,
};

Page.defaultProps = {};

export default Page;
