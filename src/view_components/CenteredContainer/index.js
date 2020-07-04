import React from 'react';
import { Container } from 'reactstrap';

import styles from './styles.module.css';

/**
 * Vertically and horizontally centered container. Parent height should be 100%.
 */
const CenteredContainer = props => {
  return (
    <Container className={styles.centered} style={{ maxWidth: props.maxWidth || null, height: props.verticalCentered ? "100%" : null }}>
      {props.children}
    </Container>
  );
};

export default CenteredContainer;

