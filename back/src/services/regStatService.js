function getRegStatPerDay(participants) {
    const statArray = participants.reduce((result, curr) => {
        const currentDate = curr.createdAt.toISOString().split('T')[0];
    
        const existingIndex = result.findIndex(item => item.createdAt === currentDate);
    
        if (existingIndex !== -1) {
            result[existingIndex].regCount++;
        } else {
            result.push({ createdAt: currentDate, regCount: 1 });
        }
    
        return result;
    }, []);

    return statArray;
}

export default getRegStatPerDay;