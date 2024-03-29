package com.backend.service1.Controller;

import com.backend.service1.Entity.Medicine;
import com.backend.service1.Service.MedicineService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.InvocationTargetException;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("api/v1/medicine")
public class MedicineController {


    private static final Logger logger = LoggerFactory.getLogger(MedicineController.class);

    @Autowired
    private MedicineService medicineService;

    @PostMapping
    public ResponseEntity<Medicine> addMedicine(@RequestBody Medicine medicine)
    {
        String methodName = "addMedicine";
        long startTime = System.currentTimeMillis();
        logger.info("Method : {} started at: {}" ,  methodName, startTime);
        logger.info("Adding Medicine : {} ,  Method : {} , ClassName : {}" , medicine , methodName , this.getClass().getSimpleName());
        Medicine medicine1 = medicineService.addMedicine(medicine);
        logger.info("Added Medicine Successfully : {} ,  Method : {} , ClassName : {}" , medicine , methodName , this.getClass().getSimpleName());
        long endTime = System.currentTimeMillis();
        logger.info("Method : {} ended at: {}" ,  methodName, endTime);
        long timeTaken = endTime - startTime;
        logger.info("Time taken by Method : {} to complete is ; {}" , methodName , timeTaken);
        return ResponseEntity.ok(medicine1);
    }

    @GetMapping
    public ResponseEntity<List<Medicine>> getAllMedicines()
    {
        String methodName = "getAllMedicines";
        long startTime = System.currentTimeMillis();
        logger.info("Method : {} started at: {} : {} " ,  methodName, startTime , this.getClass().getSimpleName());
        List<Medicine> medicineList = medicineService.getAllMedicines();
        long endTime = System.currentTimeMillis();
        logger.info("Method : {} ended at: {}" ,  methodName, endTime);
        long timeTaken = endTime - startTime;
        logger.info("Time taken by Method : {} to complete is : {} : {}" , methodName , timeTaken , this.getClass().getSimpleName());
        return ResponseEntity.status(HttpStatus.OK).body(medicineList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Medicine> getMedicineById(@PathVariable String id)
    {
        String methodName = "getMedicineById";
        long startTime = System.currentTimeMillis();
        logger.info("Method : {} started at: {} : {}" ,  methodName, startTime , this.getClass().getSimpleName());
        Medicine medicine = medicineService.getMedicineById(id);
        long endTime = System.currentTimeMillis();
        logger.info("Method : {} ended at: {}" ,  methodName, endTime);
        long timeTaken = endTime - startTime;
        logger.info("Time taken by Method : {} to complete is : {} : {}" , methodName , timeTaken , this.getClass().getSimpleName());
        return ResponseEntity.ok(medicine);
    }

    @GetMapping("/name/{name}")
    public ResponseEntity<Medicine> getMedicineByName(@PathVariable String name)
    {
        String methodName = "getMedicineByName";
        long startTime = System.currentTimeMillis();
        logger.info("Method : {} started at: {} : {}" ,  methodName, startTime , this.getClass().getSimpleName());
        Medicine medicine = medicineService.getMedicineByName(name);

        if(medicine == null)
        {
            logger.info("Error fetching element by name : {} , Method : {} : {}" , name , methodName , this.getClass().getSimpleName());
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        long endTime = System.currentTimeMillis();
        logger.info("Method : {} ended at: {}" ,  methodName, endTime);
        long timeTaken = endTime - startTime;
        logger.info("Time taken by Method : {} to complete is : {} ; {}" , methodName , timeTaken , this.getClass().getSimpleName());
        return ResponseEntity.ok(medicine);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Medicine> updateMedicinebyId(@PathVariable String id , @RequestBody Medicine medicine) throws InvocationTargetException, IllegalAccessException {

        String methodName = "updateMedicineById";
        long startTime = System.currentTimeMillis();
        logger.info("Method : {} started at: {} : {}" ,  methodName, startTime , this.getClass().getSimpleName());
        Medicine medicine1 = medicineService.updateMedicineById(id , medicine);
        long endTime = System.currentTimeMillis();
        logger.info("Method : {} ended at: {}" ,  methodName, endTime);
        long timeTaken = endTime - startTime;
        logger.info("Time taken by Method : {} to complete is : {} : {}" , methodName , timeTaken , this.getClass().getSimpleName());
        return ResponseEntity.ok(medicine1);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteMedicinebyId(@PathVariable String id)
    {
        String methodName = "deleteMedicineById";
        long startTime = System.currentTimeMillis();
        logger.info("Method : {} started at: {} : {}" ,  methodName, startTime , this.getClass().getSimpleName());
        boolean bool = medicineService.deleteMedicineById(id);

        if(!bool)
        {
            logger.info("Error finding element by id : {} , Method : {} , {}" ,  id , methodName , this.getClass().getSimpleName());
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        long endTime = System.currentTimeMillis();
        logger.info("Method : {} ended at: {}" ,  methodName, endTime);
        long timeTaken = endTime - startTime;
        logger.info("Time taken by Method : {} to complete is : {} , : {}" , methodName , timeTaken , this.getClass().getSimpleName());

        return new ResponseEntity<>(HttpStatus.OK);
    }
}


