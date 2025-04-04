// background-changer.js
class BackgroundChanger {
    constructor() {
        // Array of background images to cycle through
        this.backgroundImages = [
            'trees.jpeg',  // Current background
            'cenote.png',  // Replace with your actual image names
        ];
        
        // Current background index
        this.currentIndex = 0;
        
        // Click tracking
        this.clickCount = 0;
        this.lastClickTime = 0;
        this.clickTimeout = 1000; // Reset click count after 1 second of inactivity
        
        // Initialize event listeners
        this.initEventListeners();
    }
    
    initEventListeners() {
        // Track consecutive clicks
        $('.blossoms').on('click', (e) => {
            const currentTime = Date.now();
            
            // Reset click count if too much time has passed since last click
            if (currentTime - this.lastClickTime > this.clickTimeout) {
                this.clickCount = 0;
            }
            
            this.clickCount++;
            this.lastClickTime = currentTime;
            
            // Change background after 3 consecutive clicks
            if (this.clickCount >= 3) {
                this.changeBackground();
                this.clickCount = 0; // Reset click count
            }
        });
        
        // Track horizontal scrolling
        // let lastScrollX = window.scrollX;
        // let scrollTimeout;
        
        // $(window).on('scroll', () => {
        //     const currentScrollX = window.scrollX;
            
        //     // Clear previous timeout
        //     clearTimeout(scrollTimeout);
            
        //     // Set a timeout to detect when scrolling has stopped
        //     scrollTimeout = setTimeout(() => {
        //         // Check if horizontal scroll occurred
        //         if (Math.abs(currentScrollX - lastScrollX) > 50) {
        //             this.changeBackground();
        //         }
                
        //         lastScrollX = currentScrollX;
        //     }, 150); // Wait 150ms after scrolling stops
        // });
    }
    
    changeBackground() {
        // Move to next background image
        this.currentIndex = (this.currentIndex + 1) % this.backgroundImages.length;
        
        // Apply the new background with a fade effect
        $('.blossoms').css({
            'transition': 'background-image 0.5s ease-in-out',
            'background-image': `url("${this.backgroundImages[this.currentIndex]}")`
        });
        
        // Play a sound effect for the background change
        if (window.soundManager) {
            window.soundManager.playSound('ripple', window.innerWidth / 2, window.innerHeight / 2);
        }
    }
}
