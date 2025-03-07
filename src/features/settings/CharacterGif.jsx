import React from 'react';

const CharacterGif = ({ character }) => {
    const gifs = {
        character1: '<div class="tenor-gif-embed" data-postid="17372951319481394394" data-share-method="host" data-aspect-ratio="1.39106" data-width="100%"><a href="https://tenor.com/view/transformers-megatron-laughing-haha-transformers-prime-gif-17372951319481394394">Transformers Megatron GIF</a>from <a href="https://tenor.com/search/transformers-gifs">Transformers GIFs</a></div> <script type="text/javascript" async src="https://tenor.com/embed.js"></script>', // Update with actual paths
        character2: '<div class="tenor-gif-embed" data-postid="1594858289032539525" data-share-method="host" data-aspect-ratio="1.76596" data-width="100%"><a href="https://tenor.com/view/transformers-2-ending-transformers-revenge-of-the-fallen-transformers-2-transformers-ending-optimus-prime-and-sam-gif-1594858289032539525">Transformers 2 Ending Transformers Revenge Of The Fallen GIF</a>from <a href="https://tenor.com/search/transformers+2+ending-gifs">Transformers 2 Ending GIFs</a></div> <script type="text/javascript" async src="https://tenor.com/embed.js"></script><div class="tenor-gif-embed" data-postid="1594858289032539525" data-share-method="host" data-aspect-ratio="1.76596" data-width="100%"><a href="https://tenor.com/view/transformers-2-ending-transformers-revenge-of-the-fallen-transformers-2-transformers-ending-optimus-prime-and-sam-gif-1594858289032539525">Transformers 2 Ending Transformers Revenge Of The Fallen GIF</a>from <a href="https://tenor.com/search/transformers+2+ending-gifs">Transformers 2 Ending GIFs</a></div> <script type="text/javascript" async src="https://tenor.com/embed.js"></script>', // Update with actual paths
        // Add more character GIF paths as needed
    };

    return (
        <div>
            {character && <img src={gifs[character]} alt={character} />}
        </div>
    );
};

export default CharacterGif;
