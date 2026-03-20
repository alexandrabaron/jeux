import os
import fitz  # PyMuPDF

base_path = "C:/Users/Alexandra/Desktop/emlyon/APRIL/jeux/data"
output_file = "C:/Users/Alexandra/Desktop/emlyon/APRIL/jeux/extracted_summary.txt"

pdf_files = [
    "cahier experts/APRIL-Fondation-Livre-Blanc-web.pdf",
    "cahier experts/APR_FONDATION-Sante_jeunes-80p_175x240-WEB-1.pdf",
    "cahier experts/Cahier-expert-2-18-25-ans-Vers-une-nouvelle-culture-de-la-sante-2024.pdf",
    "etudes/BVA-pour-la-Fondation-April-Etude-quantitative-Les-jeunes-et-leur-sante.pdf",
    "etudes/Fondation-APRIL-BVA-Rapport-detude-qualitative-Sante-des-jeunes-2024.pdf",
    "etudes/Fondation-APRIL-UPTOWNS-Ethnographie-digitale-Sante-des-jeunes-2024.pdf"
]

with open(output_file, 'w', encoding='utf-8') as out_f:
    for rel_path in pdf_files:
        full_path = os.path.join(base_path, rel_path)
        if not os.path.exists(full_path):
            out_f.write(f"File not found: {full_path}\n\n")
            continue
            
        try:
            doc = fitz.open(full_path)
            out_f.write(f"=== File: {rel_path} ({doc.page_count} pages) ===\n")
            
            # Extract first 10 pages and last 5 pages
            # We also want table of contents / executive summary. The first 15 pages usually cover it.
            pages_to_extract = list(range(min(15, doc.page_count)))
            if doc.page_count > 20:
                pages_to_extract.extend(list(range(doc.page_count - 5, doc.page_count)))
                
            pages_to_extract = sorted(list(set(pages_to_extract)))
            
            for p_num in pages_to_extract:
                page = doc.load_page(p_num)
                text = page.get_text()
                # Clean up newlines to save space
                text = " ".join(text.split())
                out_f.write(f"[Page {p_num+1}] {text}\n")
            out_f.write("\n" + "="*50 + "\n\n")
        except Exception as e:
            out_f.write(f"Error reading {full_path}: {e}\n\n")

print(f"Extraction complete. Output saved to {output_file}")
