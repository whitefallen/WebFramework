require 'test_helper'

class ProductManagementControllerTest < ActionDispatch::IntegrationTest
  test "should get add" do
    get product_management_add_url
    assert_response :success
  end

  test "should get show" do
    get product_management_show_url
    assert_response :success
  end

  test "should get show_detail" do
    get product_management_show_detail_url
    assert_response :success
  end

  test "should get add" do
    get product_management_add_url
    assert_response :success
  end

  test "should get modify" do
    get product_management_modify_url
    assert_response :success
  end

  test "should get delete" do
    get product_management_delete_url
    assert_response :success
  end

end
