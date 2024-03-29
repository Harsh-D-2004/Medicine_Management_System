package com.backend.service1.DTO;

import com.backend.service1.Entity.Medicine;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MedicineRepo extends CrudRepository<Medicine, String> {
}
