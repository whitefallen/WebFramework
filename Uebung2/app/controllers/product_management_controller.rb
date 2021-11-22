class ProductManagementController < ApplicationController

  def show
    @products = Product.find_each
  end

  def show_detail
    @id = params[:id]
    @product = Product.find(@id)
  end

  def add
    @param_name = params[:name]
    @param_price = params[:price]
    @last_product = Product.last
    @product_number = if !@last_product
                        1
                      else
                        Product.last.id + 1
                      end
    if @param_name.present? && @param_price.present?
      Product.create(name: @param_name, product_number: @product_number, price: @param_price)
      redirect_to action: 'show'
    end
  end

  def modify
    if params[:id].present?
      @updated = false
      @product = Product.find(params[:id])
      if params[:price].present?
        @updated = @product.update(price: params[:price])
      end
      if params[:name].present?
        @updated = @product.update(name: params[:name])
      end
      if @updated
        redirect_to action: 'show'
      end
    end
  end

  def delete
    if params[:id].present?
      Product.delete(params[:id])
      redirect_to action: 'show'
    end
  end
end
