puts('Aufgabe 1')
(1..100).each { |i|
  (1..i).each { |j|
    if (i % j) == 0
      puts i.to_s + " -> " + j.to_s;
    end
  }
}
puts('--------')
puts "Aufgabe 2"
class String
  def print_space
    self.each_char do |letter|
      print letter + " "
    end
  end
  def print_space_old
    for letter in 0..self.length-1
      print self[letter] + " "
    end
  end
end
x = "Test"
x.print_space
#x.print_space_old
puts('')
puts('--------')
puts "Aufgabe 3"
class Product
  def initialize(name, article_number, price, url)
    @name = name
    @article_number = article_number
    @price = price
    @url = url
  end
  def name
    @name
  end
  def article_number
    @article_number
  end
  def price
    @price
  end
  def url
    @url
  end
  def name=(name)
    @name = name
  end
  def article_number=(article_number)
    @article_number = article_number
  end
  def price=(price)
    @price = price
  end
  def url=(url)
    @url = url
  end
end

product1 = Product.new("test", "1", "120", "http://google.de")
puts product1.url
product1.url="test"
puts product1.url
puts('--------')

puts "Aufgabe 4"
class ProductCart
  def initialize
    @cart = Hash.new
  end
  def add_product(product)
    if @cart[product]
      @cart[product] = @cart[product]+1
    else
      @cart[product] = 1
    end
  end
  def cart
    @cart
  end
  def total_price
    @total_price = 0
    @cart.each { |product, amount|
      @total_price = @total_price + (product.price.to_i * amount)
    }
    @total_price
  end
end

cart1 = ProductCart.new
cart1.add_product(product1)
cart1.add_product(product1)
product2 = Product.new("test2", "2", "20", "url")
cart1.add_product(product2)
cart1.cart.each {  |product, amount|
  puts amount
  puts product.name.to_s + " " + product.article_number.to_s  + " " + product.price.to_s + " " + product.url.to_s
}
puts("Total Price: " + cart1.total_price.to_s)
puts cart1.cart