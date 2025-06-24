public class SpecialCharecterTest {
    public static void main(String[] args) {
        System.out.println("hi");
        String input = "Hello สวัสดี!@# 123\nใหม่ๆๆๆ 😊 ^_^";
        //String input = "Hello สวัสดี!@# 123\n\rใหม่ๆๆๆ 😊 ^_^";
        //String input = "Hello สวัสดี!@# 123\rใหม่ๆๆๆ 😊 ^_^";

        // ยอมรับ ไทย อังกฤษ ตัวเลข และ special characters พื้นฐาน
        String filtered = input.replaceAll("[^\\u0E00-\\u0E7Fa-zA-Z0-9!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>/? ]", " ");

        System.out.println("Original:\n" + input);
        System.out.println("Filtered:\n" + filtered);
    }
}
