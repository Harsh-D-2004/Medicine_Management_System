package com.backend.service1.Service;

import com.backend.service1.DTO.MedicineRepo;
import com.backend.service1.Entity.Medicine;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.apache.commons.beanutils.BeanUtils;
import java.lang.reflect.InvocationTargetException;
import java.util.List;
import java.util.Objects;

@Service
public class MedicineService {

    @Autowired
    private MedicineRepo medicineRepo;

    private static final Logger logger = LoggerFactory.getLogger(MedicineService.class);

    public Medicine addMedicine(Medicine medicine)
    {
        String methodName = "addMedicine";
        logger.info("Saving to database : {} ,  Method : {} , ClassName : {}" , medicine , methodName , this.getClass().getSimpleName());
        if(medicine == null)
        {
            logger.info("Error : {} ,  Method : {} , ClassName : {}" , medicine , methodName , this.getClass().getSimpleName());
            return null;
        }
        medicineRepo.save(medicine);
        logger.info("Successfully saved to database : {} ,  Method : {} , ClassName : {}" , medicine , methodName , this.getClass().getSimpleName());
        return medicine;
    }

    public List<Medicine> getAllMedicines()
    {
        String methodName = "getAllMedicines";
        logger.info("Getting all medicines from database ,  Method : {} , ClassName : {}" , methodName , this.getClass().getSimpleName());
        List<Medicine> medicineList = (List<Medicine>) medicineRepo.findAll();
        if(medicineList.isEmpty())
        {
            logger.info("Error retrieving from database ,  Method : {} , ClassName : {}" , methodName , this.getClass().getSimpleName());
            return null;
        }
        logger.info("Successfully got all the medicines from database ,  Method : {} , ClassName : {}" , methodName , this.getClass().getSimpleName());
        return medicineList;
    }

    @SuppressWarnings("null")
    public Medicine getMedicineById(String Id)
    {
        String methodName = "getMedicineById";
        logger.info("Getting medicine with id : {} ,  Method : {} , ClassName : {}" ,Id, methodName , this.getClass().getSimpleName());
        return medicineRepo.findById(Id).orElseThrow(() -> {
            logger.info("No such element with id : {} ,  Method : {} , ClassName : {}" ,Id, methodName , this.getClass().getSimpleName());
            return null;
        });
    }

    public Medicine getMedicineByName(String Name)
    {
        String methodName = "getMedicineByName";
        logger.info("Getting medicine by Name : {} ,  Method : {} , ClassName : {}" ,Name, methodName , this.getClass().getSimpleName());
        List<Medicine> medicineList = (List<Medicine>) medicineRepo.findAll();

        for(Medicine medicine : medicineList)
        {
            if(Objects.equals(medicine.getName(), Name))
            {
                logger.info("Found medicine by Name : {} ,  Method : {} , ClassName : {}" ,Name, methodName , this.getClass().getSimpleName());
                return medicine;
            }
        }
        logger.info("Error retrieving element by Name : {} ,  Method : {} , ClassName : {}" ,Name, methodName , this.getClass().getSimpleName());
        return null;
    }

    @SuppressWarnings("null")
    public Medicine updateMedicineById(String medId , Medicine medicine) throws InvocationTargetException, IllegalAccessException {
        String methodName = "updateMedicineById";
        logger.info("updating medicine with id : {} ,  Method : {} , ClassName : {}" ,medId, methodName , this.getClass().getSimpleName());
        @SuppressWarnings("null")
        Medicine medicine1 = medicineRepo.findById(medId).orElseThrow(() -> {
            logger.info("No such element with id : {} ,  Method : {} , ClassName : {}" ,medId, methodName , this.getClass().getSimpleName());
            return null;
        }
        );

        BeanUtils.copyProperties(medicine1 , medicine);
        logger.info("Updated Medicine successfully with id : {} ,  Method : {} , ClassName : {}" ,medId, methodName , this.getClass().getSimpleName());
        medicineRepo.save(medicine);
        logger.info("Database updated with id : {} ,  Method : {} , ClassName : {}" ,medId, methodName , this.getClass().getSimpleName());
        return medicine1;
    }

    @SuppressWarnings({ "unused", "null" })
    public boolean deleteMedicineById(String id)
    {
        String methodName = "deleteMedicineById";
        logger.info("Deleting medicine with id : {} ,  Method : {} , ClassName : {}" ,id, methodName , this.getClass().getSimpleName());
        Medicine medicine1 = medicineRepo.findById(id).orElseThrow(() -> {
            logger.info("No such element with id : {} ,  Method : {} , ClassName : {}" ,id, methodName , this.getClass().getSimpleName());
            return null;
            }
        );

        medicineRepo.deleteById(id);
        logger.info("Deleted medicine successfully with id : {} ,  Method : {} , ClassName : {}" ,id, methodName , this.getClass().getSimpleName());
        return true;
    }

}
