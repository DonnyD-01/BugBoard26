package org.bugboard.backend.azure;

import com.azure.storage.blob.BlobClient;
import com.azure.storage.blob.BlobContainerClient;
import com.azure.storage.blob.models.BlobHttpHeaders;
import com.azure.storage.blob.models.BlobProperties;
import org.bugboard.backend.service.ImageService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.Arrays;
import java.util.UUID;

@Service
public class AzureImageService implements ImageService {

    private final BlobContainerClient blobContainerClient;
    String[] allowedExtensions = {".jpe",".jpg",".jpeg",".png",".gif",".bmp",".ico",".svg",".svgz",".tif",".ai",".drw",".pct",".psp",".xcf",".raw",".webp",".heic"};

    public AzureImageService(BlobContainerClient blobContainerClient) {
        this.blobContainerClient = blobContainerClient;
    }

    @Override
    public String uploadFile(MultipartFile file) throws IOException {
        String fileName = file.getOriginalFilename();
        InputStream data=file.getInputStream();
        long fileSize=file.getSize();

        String newFileName;
        if (fileName != null) {
            String fileExtension = fileName.substring(fileName.lastIndexOf("."));
            newFileName = UUID.randomUUID() + fileExtension;
            BlobClient blobClient=blobContainerClient.getBlobClient(newFileName);
            blobClient.upload(data,fileSize,true);
            addContentType(blobClient,fileExtension);
            return blobClient.getBlobUrl();
        }
        return null;
    }

    private void addContentType(BlobClient blobClient, String fileExtension){
        BlobProperties properties = blobClient.getProperties();

        BlobHttpHeaders blobHeaders = new BlobHttpHeaders();
        if(Arrays.asList(allowedExtensions).contains(fileExtension)){
            blobHeaders.setContentType("image/" + fileExtension.substring(1));
        }
        blobHeaders.setContentLanguage(properties.getContentLanguage());
        blobHeaders.setCacheControl(properties.getCacheControl());
        blobHeaders.setContentEncoding(properties.getContentEncoding());
        blobHeaders.setContentMd5(properties.getContentMd5());

        blobClient.setHttpHeaders(blobHeaders);
    }
}
