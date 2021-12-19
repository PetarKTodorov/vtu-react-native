export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    const number = Math.floor(Math.random() * (max - min) + min);

    return number;
}