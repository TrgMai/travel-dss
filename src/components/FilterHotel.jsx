export default function FilterHotel() {
  return (
    <div className="w-1/4">
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="mb-6">
        <h3 className="font-semibold mb-3">Xếp theo</h3>
        <div className="space-y-2">
          <label className="flex items-center">
            <input type="radio" name="sort" className="mr-2" defaultChecked />
            <span>Độ phổ biến</span>
          </label>
          <label className="flex items-center">
            <input type="radio" name="sort" className="mr-2" />
            <span>Giá (thấp - cao)</span>
          </label>
          <label className="flex items-center">
            <input type="radio" name="sort" className="mr-2" />
            <span>Đánh giá</span>
          </label>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-3">Khoảng giá</h3>
        <div className="space-y-2">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span>0đ - 500.000đ</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span>500.000đ - 1.000.000đ</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span>1.000.000đ - 2.000.000đ</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span>2.000.000đ+</span>
          </label>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-3">Đánh giá sao</h3>
        <div className="space-y-2">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span>5 sao</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span>4 sao</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span>3 sao</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span>2 sao</span>
          </label>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-3">Tiện nghi</h3>
        <div className="space-y-2">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span>Hồ bơi</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span>Wifi miễn phí</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span>Bãi đậu xe</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span>Nhà hàng</span>
          </label>
        </div>
      </div>
    </div>
  </div>
  );
}