export const parseScenarioStream = async (response) => {
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let accumulatedData = "";

    while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        accumulatedData += decoder.decode(value, { stream: true });
    }

    console.log("Dữ liệu thô nhận được:", accumulatedData);

    try {
        // 1. Dùng Regex để tìm nội dung nằm sau chữ 'data:' 
        // Nó sẽ lấy từ dấu '{' cho đến hết chuỗi hoặc đến dấu xuống dòng tiếp theo
        const match = accumulatedData.match(/data:\s*({[\s\S]*})/);

        if (match && match[1]) {
            const jsonStr = match[1].trim();
            const parsed = JSON.parse(jsonStr);

            // Kiểm tra xem có đúng là object có câu hỏi không
            if (parsed && parsed.question) {
                console.log("✅ Đã bóc tách JSON thành công:", parsed);
                return parsed;
            }
        }
        
        // 2. Nếu cách trên thất bại, thử tìm mọi thứ trong cặp dấu ngoặc nhọn {}
        const fallbackMatch = accumulatedData.match(/{[\s\S]*}/);
        if (fallbackMatch) {
            const parsed = JSON.parse(fallbackMatch[0]);
            return parsed;
        }

        return null;
    } catch (error) {
        console.error("❌ Lỗi parse JSON:", error);
        return null;
    }
};