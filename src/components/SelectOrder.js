export function SelectOrder(originalAudios) {
    const orders = [
        ['A', "B'", 'C', "A'", 'B', "C'"],
        ['A', "C'", 'B', "A'", 'C', "B'"],
        ['B', "A'", 'C', "B'", 'A', "C'"],
        ['B', "C'", 'A', "B'", 'C', "A'"],
        ['C', "A'", 'B', "C'", 'A', "B'"],
        ['C', "B'", 'A', "C'", 'B', "A'"],
        ["A'", 'B', "C'", 'A', "B'", 'C'],
        ["A'", 'C', "B'", 'A', "C'", 'B'],
        ["B'", 'A', "C'", 'B', "A'", 'C'],
        ["B'", 'C', "A'", 'B', "C'", 'A'],
        ["C'", 'A', "B'", 'C', "A'", 'B'],
        ["C'", 'B', "A'", 'C', "B'", 'A']
    ];

    const randomOrder = orders[Math.floor(Math.random() * originalAudios.length)];

    const audios = [];

    // Loop through each id in the selected permutation
    for (let i = 0; i < randomOrder.length; i++) {
        const id = randomOrder[i];

        // Find the audio object with the matching id
        const audio = originalAudios.find(audio => audio.id === id);

        // Add the matched audio object to reorderedAudios array
        if (audio) {
            audios.push(audio);
        }
    }


    return audios;
}
