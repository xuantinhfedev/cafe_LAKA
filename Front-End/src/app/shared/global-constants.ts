export class GlobalConstants {
  // Message
  public static genericError: string = 'Có lỗi xảy ra. Vui lòng thử lại sau.';

  public static unauthorized: string = "Bạn không phải là người được quyền để truy cập trang này.";

  public static productExistError: string = "Sản phẩm đã tồn tại";

  public static productAdded: string = "Sản phẩm được thêm thành công";

  // Regex
  public static nameRegex: string = '[a-zA-Z0-9 ]*';

  public static emailRegex: string = '[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}';

  public static contactNumberRegex: string = '^[e0-9]{10,10}$';

  // Variable
  public static error: string = 'error';
}
