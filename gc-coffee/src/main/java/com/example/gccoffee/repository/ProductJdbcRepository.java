package com.example.gccoffee.repository;

import com.example.gccoffee.model.Product;
import com.example.gccoffee.model.Category;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;

import java.nio.ByteBuffer;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Locale;
import java.util.Optional;
import java.util.UUID;
import static com.example.gccoffee.jdbcUtils.toLocalDateTime;
import static com.example.gccoffee.jdbcUtils.toUUID;

public class ProductJdbcRepository implements ProductRepository {

    private final NamedParameterJdbcTemplate jdbcTemplate;


    public ProductJdbcRepository(NamedParameterJdbcTemplate jdbcTemplate){
        this.jdbcTemplate=jdbcTemplate;
    }
    @Override
    public List<Product> findAll() {
        return jdbcTemplate.query("select*from products",productRowMapper);
    }

    @Override
    public Product insert(Product product) {
        return null;
    }

    @Override
    public Product update(Product product) {
        return null;
    }

    @Override
    public Optional<Product> findById(UUID productId) {
        return Optional.empty();
    }

    @Override
    public Optional<Product> findByName(String productName) {
        return Optional.empty();
    }

    @Override
    public List<Product> findByCategory(Category category) {
        return null;
    }

    @Override
    public void deleteAll() {

    }
    private static final RowMapper<Product> productRowMapper = (resultSet, i) -> {
        var productId = toUUID(resultSet.getBytes("product_id"));
        var productName = resultSet.getString("product_name");
        var category = Locale.Category.valueOf(resultSet.getString("category"));
        var price = resultSet.getLong("price");
        var description = resultSet.getString("description");
        var createdAt = toLocalDateTime(resultSet.getTimestamp("created_at"));
        var updatedAt = toLocalDateTime(resultSet.getTimestamp("updated_at"));
        return new Product(productId,
                productName,
                category,
                price,
                description,
                createdAt,
                updatedAt
        );
    };

    private static UUID toUUID(byte[] bytes) {
        var byteBuffer= ByteBuffer.wrap(bytes);
        return new UUID(byteBuffer.getLong(), byteBuffer.getLong());
    }

    static LocalDateTime toLocalDateTime(Timestamp timestamp){
        return timestamp != null ? timestamp.toLocalDateTime() : null;
    }
}
