$(document).ready(() => {
    // Initialize sound manager and make it globally accessible
    window.soundManager = new SoundManager();
    
    // Initialize background changer
    const backgroundChanger = new BackgroundChanger();

    $(".blossoms").ripples({
        //detail of ripple animation
        resolution: 520,

        //size of each ripple
        dropRadius: 30,

        //intensity of water distortion
        perturbance: 0.02,
    });

   // Add click sound effects
    $(".blossoms").on('click', function(e) {
        // Get click position
        const x = e.clientX;
        const y = e.clientY;
        
        // Play different sounds based on click position
        if (y < window.innerHeight / 3) {
            window.soundManager.playSound('click', x, y);
        } else if (y < window.innerHeight * 2/3) {
            window.soundManager.playSound('ripple', x, y);
        } else {
            window.soundManager.playSound('splash', x, y);
        }
    });

    setInterval(function () {
        
        //calculating random width and height in 'hero' section
        var $el = $(".blossoms");
        var x = Math.random() * $el.outerWidth();
        var y = Math.random() * $el.outerHeight();
        //how large ripple will be
        var dropRadius = 50;
        //random strength
        var strength = 0.04 + Math.random() * 0.04;

        window.soundManager.playSound('ripple', x, y);

        $el.ripples("drop", x, y, dropRadius, strength);
    }, 2000);
});