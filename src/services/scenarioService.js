export const parseScenarioStream = async (response) => {
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let accumulatedData = "";
    const scenarios = [];

    while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        accumulatedData += decoder.decode(value, { stream: true });
    }

    console.log("Dữ liệu thô từ Server:", accumulatedData);

    try {
        // 1. Tách chuỗi theo chữ "data:" để tìm các khối JSON riêng biệt
        const parts = accumulatedData.split("data:");

        parts.forEach(part => {
            const trimmedPart = part.trim();
            // Kiểm tra xem phần này có chứa nội dung JSON không (bắt đầu bằng {)
            if (trimmedPart.startsWith("{")) {
                try {
                    // Trích xuất JSON bằng cách tìm cặp ngoặc nhọn {} gần nhất
                    const jsonMatch = trimmedPart.match(/{[\s\S]*}/);
                    if (jsonMatch) {
                        const parsed = JSON.parse(jsonMatch[0]);
                        // Chỉ thêm vào mảng nếu là object có câu hỏi (loại bỏ event done)
                        if (parsed && parsed.question) {
                            scenarios.push(parsed);
                        }
                    }
                } catch (e) {
                    console.warn("Bỏ qua một khối dữ liệu lỗi:", e);
                }
            }
        });

        if (scenarios.length > 0) {
            console.log(`✅ Đã bóc tách thành công ${scenarios.length} câu hỏi.`);
            return scenarios; // Trả về mảng các câu hỏi
        }

        return null;
    } catch (error) {
        console.error("❌ Lỗi hệ thống khi parse stream:", error);
        return null;
    }
};