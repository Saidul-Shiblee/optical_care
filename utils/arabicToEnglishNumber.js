const arabicToEnglishNumber = (arabicNumber) => {
    // Check if the input contains Arabic characters
    const hasArabicCharacters = /[\u0600-\u06FF]/.test(arabicNumber);
    if (!hasArabicCharacters) {
        // If there are no Arabic characters, return the input as is (assuming it's already in English)
        return parseFloat(arabicNumber);
    }
    // Define mappings for Arabic numerals to English numerals
    const arabicNumerals = '٠١٢٣٤٥٦٧٨٩';
    const englishNumerals = '0123456789';
    // Replace Arabic numerals with English numerals
    let englishNumber = '';
    for (let i = 0; i < arabicNumber.length; i++) {
        const char = arabicNumber[i];
        const index = arabicNumerals.indexOf(char);
        if (index !== -1) {
            englishNumber += englishNumerals[index];
        } else {
            englishNumber += char;
        }
    }
    // Handle decimal part if present
    const decimalSeparator = '.';
    const decimalIndex = englishNumber.indexOf(decimalSeparator);
    if (decimalIndex !== -1) {
        const integerPart = englishNumber.substring(0, decimalIndex);
        const decimalPart = englishNumber.substring(decimalIndex + 1);
        return parseFloat(integerPart) + parseFloat(decimalSeparator + decimalPart);
    } else {
        return parseInt(englishNumber, 10);
    }
};