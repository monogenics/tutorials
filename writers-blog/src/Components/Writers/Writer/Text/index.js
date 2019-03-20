import React, { Fragment } from 'react'

export default ({ title, description, published}) =>
    <Fragment>
        <h4>
            {title} {published ? `(${published})` : ""}
        </h4>

        <p>
            {description ? description : <i>No Description Found, Sorry!</i>}
        </p>

    </Fragment>