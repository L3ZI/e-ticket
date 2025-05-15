import { useParams, Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import '../styles/TicketPage.css';

const TicketPage = () => {
  const { name } = useParams();
  const canvasRef = useRef(null);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const imgRef = useRef(null);
  
  useEffect(() => {
    // Create a fresh image instance inside useEffect
    const img = new Image();
    imgRef.current = img;
    
    const tryLoadImage = (paths) => {
      if (paths.length === 0) {
        console.error("Failed to load image from all paths");
        setIsLoading(false);
        return;
      }
      
      const currentPath = paths[0];
      const remainingPaths = paths.slice(1);
      
      console.log(`Trying to load from: ${currentPath}`);
      
      // Set up load handler
      img.onload = () => {
        console.log(`Successfully loaded from: ${currentPath}`);
        setImgLoaded(true);
        setIsLoading(false);
        
        // Once loaded, immediately render to canvas
        if (canvasRef.current) {
          const canvas = canvasRef.current;
          const ctx = canvas.getContext('2d');
          
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          
          // Font styling
          ctx.font = 'bold 60px Poppins';
          ctx.fillStyle = '#1D1C45';
          ctx.fillText(name, 150, 570); // adjust position as needed
        }
      };
      
      // Set up error handler to try next path
      img.onerror = () => {
        console.error(`Failed to load from: ${currentPath}`);
        if (remainingPaths.length > 0) {
          tryLoadImage(remainingPaths);
        } else {
          setIsLoading(false);
        }
      };
      
      // Try to load the image
      img.src = currentPath;
    };
    
    // Try multiple paths to find the image
    tryLoadImage([
      '/ticket.png',
      './ticket.png',
      '/assets/ticket.png',
      '/usr/share/nginx/html/ticket.png',
      '/share/nginx/html/ticket.png'
    ]);
    
    // Cleanup
    return () => {
      if (img) {
        img.onload = null;
        img.onerror = null;
      }
    };
  }, [name]);

  const downloadTicket = () => {
    if (!canvasRef.current || !imgLoaded) return;
    
    const link = document.createElement('a');
    link.download = `${name}_ticket.png`;
    link.href = canvasRef.current.toDataURL();
    link.click();
  };

  return (
    <div className="ticket-page-container">
      <div className="ticket-card">
        <div className="ticket-header">
          <h2 className="ticket-title">Your Personalized Ticket</h2>
          <p>Hello, <span className="ticket-name">{name}</span>! Here's your farewell e-ticket.</p>
        </div>

        {isLoading && (
          <div className="loading-container">
            <p className="loading-message">Preparing your ticket...</p>
            <div className="loading-spinner"></div>
          </div>
        )}

        <div className="canvas-container" style={{ display: isLoading ? 'none' : 'block' }}>
          <canvas ref={canvasRef} className="ticket-canvas" />
        </div>

        <button 
          className="download-button" 
          onClick={downloadTicket}
          disabled={!imgLoaded || isLoading}
        >
          Download Ticket
        </button>

        <div style={{marginTop: '1.5rem'}}>
          <Link to="/" className="back-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
              </svg>
            Back to student list
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TicketPage;