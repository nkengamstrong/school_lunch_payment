import React from 'react';

function Footer() {
  return (
    <footer style={styles.footer}>
      <p>&copy; {new Date().getFullYear()} Student School Lunch. All rights reserved.</p>
      <p>Contact us: support@studentschoollunch.com</p>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: '#f1f1f1',
    textAlign: 'center',
    padding: '10px',
    position: 'fixed',
    left: '0',
    bottom: '0',
    width: '100%',
    fontSize: '14px',
    color: '#333',
  }
};

export default Footer;
