'use client'

import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { RootLayout } from "@/components/layout/RootLayout"

export default function BrandingPage() {
  // References to canvas elements
  const canvasLargeRef = useRef<HTMLCanvasElement>(null)
  const canvasSmallRef = useRef<HTMLCanvasElement>(null)
  
  // State to track if banners have been generated
  const [bannersGenerated, setBannersGenerated] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [avatarLoaded, setAvatarLoaded] = useState(false)
  
  // Tracking image load status
  const [imageObj, setImageObj] = useState<HTMLImageElement | null>(null)

  // ADJUSTABLE PARAMETERS: Modify these values to adjust the position of the avatar circle
  // Positive values move right/down, negative values move left/up
  const circleOffsetX = 0; // Horizontal offset in pixels
  const circleOffsetY = -1.5; // Vertical offset in pixels
  // End of adjustable parameters

  // Color palette extracted from your CSS
  const colors = {
    background: 'oklch(0.145 0 0)', // Dark mode background
    foreground: 'oklch(0.985 0 0)', // Dark mode foreground
    primary: 'oklch(0.985 0 0)',    // Dark mode primary
    secondary: 'oklch(0.269 0 0)',  // Dark mode secondary
    accent: 'oklch(0.269 0 0)',     // Dark mode accent
    chart1: 'oklch(0.646 0.222 41.116)',
    chart2: 'oklch(0.6 0.118 184.704)',
    chart3: 'oklch(0.398 0.07 227.392)',
    chart4: 'oklch(0.828 0.189 84.429)',
    chart5: 'oklch(0.769 0.188 70.08)'
  }
  
  // Preload avatar image
  useEffect(() => {
    const preloadImage = () => {
      const img = new window.Image();
      img.crossOrigin = 'anonymous';
      
      img.onload = () => {
        console.log("Avatar image loaded successfully");
        setImageObj(img);
        setAvatarLoaded(true);
      };
      
      img.onerror = (e) => {
        console.error("Error loading avatar image:", e);
        setErrorMessage("Failed to load avatar image. Please check the image path.");
      };
      
      const imagePath = '/avatars/rbadillap.jpg';
      console.log("Attempting to load image from:", imagePath);
      
      // Use absolute URL to ensure the image loads correctly
      img.src = window.location.origin + imagePath;
    };
    
    preloadImage();
  }, []);

  // Function to draw banner on canvas
  const drawBanner = (canvas: HTMLCanvasElement, size: number) => {
    console.log(`Drawing banner on canvas, size: ${size}`);
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      setErrorMessage("Could not get canvas context")
      return
    }

    // Set canvas dimensions
    canvas.width = size
    canvas.height = size

    // Create a subtle gradient background
    const gradient = ctx.createLinearGradient(0, 0, size, size);
    gradient.addColorStop(0, 'oklch(0.16 0.02 250)'); // Slightly bluish dark color
    gradient.addColorStop(1, 'oklch(0.13 0.01 300)'); // Slightly purplish dark color
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
    
    // Add very subtle pattern overlay
    ctx.globalAlpha = 0.05;
    for (let i = 0; i < size; i += size / 20) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(i, 0);
      ctx.strokeStyle = colors.foreground;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    // Add a placeholder for the avatar
    const avatarSize = size * 0.8
    const avatarX = (size - avatarSize) / 2
    const avatarY = (size - avatarSize) / 2

    // Create a circle clipping path for the avatar
    // Calculate circle position with offsets (scaled proportionally to the image size)
    const scaledOffsetX = circleOffsetX * (size / 512);  // Scale offset for different size canvases
    const scaledOffsetY = circleOffsetY * (size / 512);  // Scale offset for different size canvases
    const circleCenterX = size / 2 + scaledOffsetX;      // Apply horizontal offset to circle center
    const circleCenterY = size / 2 + scaledOffsetY;      // Apply vertical offset to circle center
    
    ctx.save()
    ctx.beginPath()
    // Use the offset center point for the clipping circle
    ctx.arc(circleCenterX, circleCenterY, avatarSize / 2, 0, Math.PI * 2)
    ctx.clip()

    // Draw a placeholder background for the avatar
    ctx.fillStyle = colors.secondary
    ctx.fillRect(avatarX, avatarY, avatarSize, avatarSize)
    ctx.restore()

    // Add very subtle glow effect
    ctx.shadowColor = 'rgba(255, 255, 255, 0.1)';
    ctx.shadowBlur = size * 0.03;
    ctx.beginPath();
    // Also apply the same offset to the glow effect
    ctx.arc(circleCenterX, circleCenterY, avatarSize / 2 + size * 0.01, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = size * 0.005;
    ctx.stroke();
    ctx.shadowBlur = 0;
    
    // If we have the image loaded, draw it
    if (imageObj) {
      drawAvatarOnCanvas(canvas, imageObj, size);
    }
  }

  // Function to draw avatar on canvas directly
  const drawAvatarOnCanvas = (canvas: HTMLCanvasElement, img: HTMLImageElement, size: number) => {
    console.log(`Drawing avatar on canvas, size: ${size}`);
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      setErrorMessage("Could not get canvas context")
      return
    }
    
    const avatarSize = size * 0.8
    const avatarX = (size - avatarSize) / 2
    const avatarY = (size - avatarSize) / 2
    
    // Calculate scaled offsets for this canvas size
    const scaledOffsetX = circleOffsetX * (size / 512);
    const scaledOffsetY = circleOffsetY * (size / 512);
    const circleCenterX = size / 2 + scaledOffsetX;
    const circleCenterY = size / 2 + scaledOffsetY;
    
    // Create a circle clipping path for the avatar
    ctx.save()
    ctx.beginPath()
    // Use the offset center point for the clipping circle
    ctx.arc(circleCenterX, circleCenterY, avatarSize / 2, 0, Math.PI * 2)
    ctx.clip()
    
    // Draw the avatar image - adjust the drawing position to match the circle's offset
    ctx.drawImage(img, avatarX, avatarY, avatarSize, avatarSize)
    ctx.restore()
  }

  // Function to generate banners
  const generateBanners = () => {
    console.log("Generating banners...");
    setErrorMessage(null);
    setIsLoading(true);
    
    try {
      // Check if image is loaded before proceeding
      if (!avatarLoaded || !imageObj) {
        setErrorMessage("Avatar image not loaded yet. Please wait or try refreshing the page.");
        setIsLoading(false);
        return;
      }
      
      const largeBanner = canvasLargeRef.current;
      const smallBanner = canvasSmallRef.current;
      
      if (!largeBanner || !smallBanner) {
        setErrorMessage("Canvas elements not ready. Please try again.");
        setIsLoading(false);
        return;
      }
      
      // Draw banners
      drawBanner(largeBanner, 512);
      drawBanner(smallBanner, 192);
      
      setBannersGenerated(true);
      setIsLoading(false);
    } catch (error) {
      console.error("Error generating banners:", error);
      setErrorMessage(`An error occurred while generating banners: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setIsLoading(false);
    }
  }

  // Function to download banner
  const downloadBanner = (size: '512x512' | '192x192') => {
    const canvas = size === '512x512' ? canvasLargeRef.current : canvasSmallRef.current;
    
    if (!canvas) {
      setErrorMessage("Canvas not available for download");
      return;
    }
    
    try {
      const link = document.createElement('a');
      link.download = `ronny-badilla-${size}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error("Error downloading banner:", error);
      setErrorMessage(`Failed to download banner: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Initialize canvases once the component is mounted
  useEffect(() => {
    if (avatarLoaded && imageObj) {
      console.log("Avatar loaded, initializing canvases...");
      const timer = setTimeout(() => {
        generateBanners();
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [avatarLoaded, imageObj]);

  return (
    <RootLayout>
      <div className="flex flex-col space-y-12 max-w-3xl">
        <section>
          <h1 className="text-4xl font-bold tracking-tight mb-6">Brand Resources</h1>
          <p className="text-xl text-muted-foreground">
            Download branded profile images for use across various platforms and social media.
          </p>
        </section>

        <section>
          {errorMessage && (
            <div className="bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded mb-6 relative">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{errorMessage}</span>
            </div>
          )}
          
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <div className={`h-3 w-3 rounded-full ${avatarLoaded ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="text-sm text-muted-foreground">{avatarLoaded ? 'Avatar image loaded successfully' : 'Avatar image not loaded'}</span>
            </div>
            
            <div className="p-4 bg-muted rounded-md mb-4">
              <h3 className="text-sm font-medium mb-2">Circle Position Adjustments</h3>
              <p className="text-xs text-muted-foreground mb-2">
                To adjust the position of the circular mask, modify the <code className="bg-background px-1 py-0.5 rounded font-mono">circleOffsetX</code> and <code className="bg-background px-1 py-0.5 rounded font-mono">circleOffsetY</code> values at the top of the file.
              </p>
              <p className="text-xs text-muted-foreground">
                Current offsets: X = {circleOffsetX}px, Y = {circleOffsetY}px
              </p>
            </div>
            
            <Button 
              onClick={generateBanners} 
              disabled={isLoading || !avatarLoaded}
              className="w-full sm:w-auto"
            >
              {isLoading ? 'Generating...' : 'Generate Brand Images'}
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>512 x 512 Image</CardTitle>
                <CardDescription>High resolution image for social media profiles</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <canvas 
                  ref={canvasLargeRef}
                  width="512"
                  height="512"
                  className="border border-gray-300 dark:border-gray-700 rounded-md max-w-full"
                ></canvas>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={() => downloadBanner('512x512')}
                  disabled={!bannersGenerated}
                  className="w-full"
                >
                  Download 512x512 Image
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>192 x 192 Image</CardTitle>
                <CardDescription>Compact image for smaller displays</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <canvas 
                  ref={canvasSmallRef}
                  width="192"
                  height="192"
                  className="border border-gray-300 dark:border-gray-700 rounded-md"
                ></canvas>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={() => downloadBanner('192x192')}
                  disabled={!bannersGenerated}
                  className="w-full"
                >
                  Download 192x192 Image
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        <section>
            <Card>
                <CardHeader>
                    <CardTitle>About These Resources</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>
                        These branding images feature your profile avatar on a subtle gradient background, 
                        creating a professional and elegant look that will work well across different platforms.
                    </p>
                    <p>
                        The images are designed to be eye-catching while maintaining a clean, minimalist 
                        aesthetic that doesn't distract from your personal brand.
                    </p>
                </CardContent>
            </Card>
        </section>
      </div>
    </RootLayout>
  )
} 